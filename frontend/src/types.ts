export interface Task {
	id: number;
	title: string;
	description: string;
	dueDate: string;
	dueTime?: string;
	categoryId?: number;
	status?: 'pending' | 'in_progress' | 'completed';
	duration?: number;
}

export interface Category {
	id: number;
	name: string;
	color?: string;
}
