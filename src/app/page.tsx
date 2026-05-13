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

    const{error} = await supabase
    .from("companies")
    .insert({
      name: name,
      industry: industry,

    })
    if(error){
      alert(error.message )
        return
      
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

  return (
    <main>
      <h1> Companies</h1>

      <form onSubmit={handleSubmit}> 
        <input
        type= "text"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input 
        type="text"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        />

        <button type="submit"> Add company</button>
      </form>

     


      {companies.map((company) => (
        <div key={company.id}>
          <h2>{company.name}</h2>
          <p>{company.industry}</p>

          <button onClick={() => deleteCompany(company.id)}>Delete</button>
        </div>
      ) )}
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