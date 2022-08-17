export class TaskDto {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly status: boolean;
    readonly created_at: Date;
}
