import { z } from 'zod';

export const momSchema = z.object({
	// Note: without default values
	dateOfRegistry: z.string().min(1, 'Date of Registry is required'),
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last Name is required'),
	age: z.number().min(1, 'Age is required'),
	phoneNumber: z.number().min(1, 'Phone Number is required'),
	email: z.string().email().min(1, 'Email is required'),
	area: z.string().min(1, 'Area is required'),
	occupation: z.boolean(),
	pregnant: z.boolean()
	// avatar: z.boolean()

	// Note: with default values to make testing easier
	// dateOfRegistry: z
	// 	.string()
	// 	.min(1, 'Date of Registry is required')
	// 	.default(new Date().toISOString().slice(0, 10)),
	// firstName: z.string().min(1, 'First Name is required').default('Test'),
	// lastName: z.string().min(1, 'Last Name is required').default('Test'),
	// age: z.number().min(1, 'Age is required').default(1),
	// phoneNumber: z.number().min(1, 'Phone Number is required').default(1),
	// email: z.string().email().min(1, 'Email is required').default('test@gmail.com'),
	// area: z.string().min(1, 'Area is required').default('Test'),
	// occupation: z.boolean().default(false),
	// pregnant: z.boolean().default(false)
	// avatar: z.boolean()
});
