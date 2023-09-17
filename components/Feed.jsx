"use client";
import Card from "./Card";
import {useEffect, useState} from 'react';


const CardList =({data, onTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map(prompt =>(<Card key={prompt._id} prompt={prompt}/>))}
    </div>
  )
}

const Feed = () => {
  const [q, setQ] =useState('');
  const [prompts, setPrompts] =useState([]);
  useEffect(() =>{
    const fetchPrompts =async () =>{
      try {
        const response =await fetch("api/prompt");
        const data =await response.json();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPrompts();
  }, [])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" className="search_input peer" placeholder="Search prompts" value={q} onChange={e =>setQ(e.target.value)}/>
      </form>
      <CardList data ={prompts} onTagClick={() =>{}}/>
    </section>
  )
}

export default Feed;