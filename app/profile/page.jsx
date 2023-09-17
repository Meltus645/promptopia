"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileComponent from "@/components/Profile";


const Profile = () => {
    const router =useRouter();
    const {data: session} =useSession();
    const [prompts, setPrompts] =useState([]);
    
    const handleEdit = prompt =>{
        router.push(`/update-prompt?id=${prompt._id}`);
    }
    
    const handleDelete =async prompt =>{
        const confirmed =confirm("Are you sure to delete this prompt?");
        if(confirmed){
            try {
                await fetch(`/api/prompt/${prompt._id.toString()}`, {
                    method: 'DELETE',
                });
                const filteredPrompts =prompts.filter(({_id}) =>_id !=prompt._id);
                setPrompts(filteredPrompts);
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    useEffect(() =>{
        const fetchPrompts =async () =>{
            try {
                const response =await fetch(`api/users/${session?.user.id}/prompts`);
                const data =await response.json();
                setPrompts(data);
            } catch (error) {
                console.error(error);
            }
        }
    if(session?.user.id) fetchPrompts();
    }, [])
    return (
    <ProfileComponent name={'My'} desc={'Welcome to your personalized profile page'} data={prompts} handleDelete={handleDelete} handleEdit={handleEdit}/>
  )
}

export default Profile;