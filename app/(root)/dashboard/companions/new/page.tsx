import CompanionForm from "@/components/CompanionForm"

const NewCompanion = () => {
  return (
    <main className="companion-builder-section">
      <article className="w-full gap-4 flex flex-col">
        <h1 className="text-center">Companion Builder</h1>
        <CompanionForm ></CompanionForm>
      </article>
    </main>
  )
}

export default NewCompanion
