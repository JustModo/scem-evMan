
export interface InputVariable {
    variable: string;
    type: string; // "int" | "float" | "char" | "string" | "int_array" | ...
}

export function serializeInput(
    inputValues: Record<string, unknown>,
    variables: InputVariable[]
): string {
    if (!variables || variables.length === 0) return "";

    const parts: string[] = [];

    for (const v of variables) {
        const val = inputValues[v.variable];

        // Handle Arrays (int_array, float_array, string_array)
        if (v.type.includes("_array")) {
            // Expecting array or comma-separated string (if coming from raw input)
            let arr: unknown[] = [];
            if (Array.isArray(val)) {
                arr = val;
            } else if (typeof val === 'string') {
                // Attempt to parse "1,2,3" if user typed format was weird, but UI gives array?
                // Actually UI input (Input component) returns string usually? 
                // Wait, TestCaseCard uses Input box. User types "1,2,3"? 
                // My previous logic allowed z.any().
                // If user types "1,2,3" in Input, val is "1,2,3".
                // We should split by comma to treat as array elements.
                arr = val.split(',').map(s => s.trim()).filter(s => s !== "");
            }

            // Append size
            parts.push(String(arr.length));
            // Append elements
            arr.forEach(item => parts.push(String(item)));

        } else {
            // Scalar types (int, float, char, string)
            parts.push(String(val ?? ""));
        }
    }

    return parts.join(" ");
}

export function deserializeInput(
    serialized: string,
    variables: InputVariable[]
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    if (!serialized || !variables || variables.length === 0) return result;

    // Split by whitespace
    const tokens = serialized.trim().split(/\s+/);
    let p = 0;

    for (const v of variables) {
        if (p >= tokens.length) break;

        if (v.type.includes("_array")) {
            // Read Size
            const sizeStr = tokens[p++];
            const size = parseInt(sizeStr, 10);

            if (isNaN(size)) {
                console.error(`Invalid size for array ${v.variable}: ${sizeStr}`);
                result[v.variable] = [];
                continue;
            }

            const elements: string[] = [];
            for (let i = 0; i < size; i++) {
                if (p < tokens.length) {
                    elements.push(tokens[p++]);
                }
            }

            result[v.variable] = elements;
        } else {
            // Scalar
            const val = tokens[p++];
            result[v.variable] = val;
        }
    }

    return result;
}
