"use client";
import {useState} from 'react';
import Form from '@/components/Form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} =useSession();
    const [submitting, setSubmitting] =useState(false);
    const [post, setPost] =useState({prompt: '', tag: ''});
    const createPost =async e =>{
        e.preventDefault();
        setSubmitting(true);
        try {
            const response =await fetch("/api/prompt/new", {
                method: 'POST',
                body: JSON.stringify({...post, userId: session?.user.id})
            });
            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false);
        }
    }
    return (
        <Form type ="Create" post ={post} setPost ={setPost} submitting ={submitting} handleSubmit ={createPost}/>
    )
}

export default CreatePrompt;