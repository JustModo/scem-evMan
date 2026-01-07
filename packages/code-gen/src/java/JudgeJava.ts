import { Judge, ProblemConfig, LanguageConfig } from '../types';
import * as configFile from './config.json';

const config = configFile as LanguageConfig;

export class JudgeJava implements Judge {
    wrapCode(userCode: string, problemConfig: ProblemConfig): string {
        const template = config.template;
        const inputReadingCode = this.generateInputReader(problemConfig);

        // Extract imports
        const importRegex = /^\s*import\s+[\w.]+.*;/gm;
        const imports = (userCode.match(importRegex) || []).join('\n');
        const codeWithoutImports = userCode.replace(importRegex, '').trim();

        const finalCode = template
            .replace('{code}', codeWithoutImports)
            .replace('{input_reading_code}', inputReadingCode);

        return imports + '\n' + finalCode;
    }

    generateInputReader(problemConfig: ProblemConfig): string {
        const lines: string[] = [];
        const variables: string[] = [];
        const indent = "        ";
        const typeConfig = config.types;

        if (problemConfig.input && Array.isArray(problemConfig.input)) {
            for (const param of problemConfig.input) {
                const typeConf = typeConfig[param.type];
                if (typeConf && typeConf.reader) {
                    const reader = typeConf.reader.split('{var}').join(param.variable);
                    if (param.type.includes('array')) {
                        lines.push(`${indent}${reader}`);
                    } else {
                        lines.push(`${indent}${typeConf.hint} ${param.variable} = ${reader};`);
                    }
                }
                variables.push(param.variable);
            }
        }

        if (problemConfig.method) {
            lines.push(`${indent}Code.${problemConfig.method}(${variables.join(', ')});`);
        }

        return lines.join('\n');
    }

    generateBoilerplate(problemConfig: ProblemConfig): string {
        const method = problemConfig.method || 'solve';
        const args: string[] = [];
        const typeConfig = config.types;

        if (problemConfig.input && Array.isArray(problemConfig.input)) {
            for (const param of problemConfig.input) {
                const typeInfo = typeConfig[param.type] || { hint: 'void', reader: '' };
                args.push(`${typeInfo.hint} ${param.variable}`);
            }
        }

        return config.boilerplate
            .replace('{method}', method)
            .replace('{args}', args.join(', '));
    }
}
