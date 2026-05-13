"use client"

import {useEffect , useState} from "react"
import {supabase } from "../lib/supabase"


type Company = {
  id: number
  name: string
  industry: string
}

export default function Home(){
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    async function loadCompanies(){
      const {data,error}  = await supabase
      .from("companies")
      .select("*")

      if(error){
        console.error("Supabase error:", error)
        alert(error.message)
        return
      }

      setCompanies(data)
    }

    loadCompanies()
  }, [])

  return(
    <main>
      <h1> Companes</h1>
      {companies.map((company) => (
        <div key={company.id}>
          <h2>{company.name}</h2>
          <p>{company.industry}</p>
        </div>
      )
      )}
    </main>
  )
}