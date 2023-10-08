export const load = async () => {
	return {
		columns: [
			{
				id: 1,
				label: '📫 Todo'
			},
			{
				id: 2,
				label: '✅ In Progress'
			},
			{
				id: 3,
				label: 'Done'
			}
		],
		cards: [
			{
				column: 1,
				id: 'a',
				title: 'Get groceries'
			},
			{
				column: 2,
				id: 'b',
				title: 'Walk the dog'
			}
		]
	};
};
