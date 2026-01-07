import { JudgePython } from './python/JudgePython';
import { JudgeC } from './c/JudgeC';
import { JudgeJava } from './java/JudgeJava';
import { Judge } from './types';

export const judges: Record<string, new () => Judge> = {
    'python': JudgePython,
    'c': JudgeC,
    'java': JudgeJava
};

export {
    JudgePython,
    JudgeC,
    JudgeJava
};

export * from './types';