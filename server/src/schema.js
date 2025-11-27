import vine from "@vinejs/vine";

const divisionEnum = ['LnT', 'EEO', 'PR', 'HRD', 'RnD']
const statusEnum = ['open', 'in-review', 'resolved']

const CreateUpdateSchema = {
  name: vine.string().minLength(1).maxLength(50),
  email: vine.string().email().minLength(1).maxLength(50),
  eventName: vine.string().minLength(1).maxLength(50),
  division: vine.enum(divisionEnum),
  rating: vine.number().min(1).max(5),
  comment: vine.string().optional(),
  suggestion: vine.string().optional(),
  status: vine.enum(statusEnum).optional(),
}

const CreateFeedbackSchema = vine.object(CreateUpdateSchema);
const UpdateFeedbackSchema = vine.object(CreateUpdateSchema);

export { CreateFeedbackSchema, UpdateFeedbackSchema }