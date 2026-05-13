"use client"

import {useEffect, useState} from "react"
import {supabase} from "../lib/supabase"
import { error } from "console"

type Company = {
  id: number
  name: string
  industry: string
}

export default function Home(){
  const [companies, setCompanies] = useState<Company[]>([])
  const [name, setName] = useState("")
  const [industry, setIndustry] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  async function loadCompanies(){
    const {data,error} = await supabase
    .from ("companies")
    .select("*")
    .order("id", {ascending:true})

    if(error){
      alert(error.message)
      return
    }
    setCompanies(data)
  }
  useEffect(() => {
    loadCompanies()
  }, [] )

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()

    if(editingId){
      const {error} = await supabase
      .from("companies")
      .update({
        name: name,
        industry: industry,
      })
      .eq("id", editingId)

      if(error){
        alert(error.message)
        return
      }


      setEditingId(null)


    }else{
      const {error } = await supabase
      .from ("companies")
      .insert({
        name: name,
        industry: industry,
      })

      if(error){
        alert(error.message)
        return
      }

    }

    setName("")
    setIndustry("")
    loadCompanies()
  }

async function deleteCompany(id: number){
        const { error } = await supabase
        .from("companies")
        .delete()
        .eq("id",id)

        if(error){
          alert(error.message)
          return
        }
        loadCompanies()

      }

      function startEdit(company: Company){
        setEditingId(company.id)
        setName(company.name)
        setIndustry(company.industry)
      }
      async function signIn() {
        const { error } = await supabase.auth.signInWithPassword({
          email: "nelly.sosobrado@gmail.com",
          password: "Password123!",
        })

        if (error) {
          alert(error.message)
          return
        }

        alert("Logged in!")
      }




return (
  <main className="min-h-screen bg-slate-950 text-white p-8">
    <div className="mx-auto max-w-3xl">
      <section className="mb-8">
        <h1 className="text-4xl font-bold">Company Tracker</h1>

        <button 
        // onClick={signUp} 
        onClick={signIn}
        className="mt-4 rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-500">
          Test Sign in
        </button>


      </section>

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-2xl bg-slate-900 p-6 shadow-lg border border-slate-800"
      >
        <h2 className="mb-4 text-xl font-semibold">
          {editingId ? "Edit company" : "Add new company"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-lg bg-slate-800 px-4 py-3 text-white outline-none border border-slate-700 focus:border-blue-500"
            type="text"
            placeholder="Company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="rounded-lg bg-slate-800 px-4 py-3 text-white outline-none border border-slate-700 focus:border-blue-500"
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>

        <button
          className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          type="submit"
        >
          {editingId ? "Update company" : "Add company"}
        </button>
      </form>

      <section className="grid gap-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="rounded-2xl bg-slate-900 p-5 shadow-lg border border-slate-800"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <p className="text-slate-400">{company.industry}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
                  onClick={() => startEdit(company)}
                >
                  Edit
                </button>

                <button
                  className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-500"
                  onClick={() => deleteCompany(company.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  </main>
)

}


// "use client"

// import {useEffect , useState} from "react"
// import {supabase } from "../lib/supabase"


// type Company = {
//   id: number
//   name: string
//   industry: string
// }

// export default function Home(){
//   const [companies, setCompanies] = useState<Company[]>([])

//   useEffect(() => {
//     async function loadCompanies(){
//       const {data,error}  = await supabase
//       .from("companies")
//       .select("*")

//       if(error){
//         console.error("Supabase error:", error)
//         alert(error.message)
//         return
//       }

//       setCompanies(data)
//     }

//     loadCompanies()
//   }, [])

//   return(
//     <main>
//       <h1> Companes</h1>
//       {companies.map((company) => (
//         <div key={company.id}>
//           <h2>{company.name}</h2>
//           <p>{company.industry}</p>
//         </div>
//       )
//       )}
//     </main>
//   )
// }