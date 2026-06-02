export type OperationState = {
  status: "idle" | "running";
  name?: string;
  startedAt?: string;
};

const currentOperation: OperationState = { status: "idle" };

export function getOperationState() {
  return currentOperation;
}

export function isOperationRunning() {
  return currentOperation.status === "running";
}

export function markOperationRunning(name: string) {
  currentOperation.status = "running";
  currentOperation.name = name;
  currentOperation.startedAt = new Date().toISOString();
}

export function markOperationIdle() {
  currentOperation.status = "idle";
  delete currentOperation.name;
  delete currentOperation.startedAt;
}
