import { Judge, ProblemConfig, LanguageConfig } from '../types';
import * as configFile from './config.json';

const config = configFile as LanguageConfig;

export class JudgePython implements Judge {
    generateBoilerplate(problemConfig: ProblemConfig): string {
        const method = problemConfig.method || 'solve';
        const args: string[] = [];
        if (problemConfig.input && Array.isArray(problemConfig.input)) {
            for (const param of problemConfig.input) {
                const typeInfo = config.types[param.type] || { hint: 'Any', reader: '' };
                args.push(`${param.variable}: ${typeInfo.hint}`);
            }
        }
        return config.boilerplate
            .replace('{method}', method)
            .replace('{args}', args.join(', '));
    }

    wrapCode(userCode: string, problemConfig: ProblemConfig): string {
        const template = config.template;
        const inputReadingCode = this.generateInputReader(problemConfig);

        return template
            .replace('{code}', userCode)
            .replace('{input_reading_code}', inputReadingCode);
    }

    generateInputReader(problemConfig: ProblemConfig): string {
        const lines: string[] = [];
        const variables: string[] = [];
        const indent = "        ";

        if (problemConfig.input && Array.isArray(problemConfig.input)) {
            for (const param of problemConfig.input) {
                const typeConf = config.types[param.type];
                const reader = typeConf ? typeConf.reader : `next(iterator) # Unknown type ${param.type}`;
                lines.push(`${indent}${param.variable} = ${reader}`);
                variables.push(param.variable);
            }
        }

        const method = problemConfig.method || 'solve';
        lines.push(`${indent}${method}(${variables.join(', ')})`);

        return lines.join('\n');
    }
}
