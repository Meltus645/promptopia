import Link from "next/link";

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left"><span className="blue_gradient">{type} Post</span></h1>
      <p className="desc text-left max-w-md">{type} & share amazing prompts and let your imagination run wild with any AI-powered platform.</p>
      <form className="mt-10 w-full w-max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-1">
          <label className="font-satoshi font-semibold text-base text-gray-500">Your AI Prompt</label>
          <textarea value ={post.prompt} onChange={e =>setPost({...post, prompt: e.target.value})} placeholder="Write your prompt here." className="form_textarea" style={{resize: 'none'}}></textarea>
        </div> 
        <div className="flex w-full flex-col gap-1">
          <label  className="font-satoshi font-semibold text-base text-gray-500">Tag</label>
          <input value ={post.tag} onChange={e =>setPost({...post, tag: e.target.value})} placeholder="#tag" className="form_input"/>
        </div>
        <div className="flex-end mx-4 mb-5 gap-4">
          <Link href={'/'} className="text-gray-500 text-sm">Cancel</Link>
          <button disabled ={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">{submitting? `${type}...`: type}</button>
        </div>
      </form>
    </section>
  )
}

export default Form;