export function draggable(node: HTMLElement, data: any) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handle_dragstart(e: DragEvent) {
		if (!e.dataTransfer) return;
		e.dataTransfer.setData('text/plain', state);
	}

	node.addEventListener('dragstart', handle_dragstart);

	return {
		update(data: any) {
			state = data;
		},

		destroy() {
			node.removeEventListener('dragstart', handle_dragstart);
		}
	};
}

interface DropzoneOptions {
	dropEffect?: 'move' | 'none' | 'copy' | 'link';
	dragover_class?: string;
	on_dropzone(data: string, event: DragEvent): void;
}

export function dropzone(node: HTMLElement, options: DropzoneOptions) {
	let state: DropzoneOptions = {
		dropEffect: 'move',
		dragover_class: 'droppable',
		...options
	};

	function handle_dragenter(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class || '');
	}

	function handle_dragleave(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class || '');
	}

	function handle_dragover(e: DragEvent) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		// @ts-ignore
		e.dataTransfer.dropEffect = state.dropEffect;
	}

	function handle_drop(e: DragEvent) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const data = e.dataTransfer.getData('text/plain');
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class || '');
		state.on_dropzone(data, e);
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update(options: DropzoneOptions) {
			state = {
				dropEffect: 'move',
				dragover_class: 'droppable',
				...options
			};
		},

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}