"use client";
import Form from '@/components/Form';
import {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const UpdatePrompt = () => {

    const router = useRouter();
    const params =useSearchParams();
    const promptId =params.get('id');
    const [submitting, setSubmitting] =useState(false);
    const [prompt, setPrompt] =useState({prompt: '', tag: ''});

    const editPrompt =async e =>{

        e.preventDefault();
        if(!promptId) return alert("Missing Prompt ID");
        setSubmitting(true);
        try {
            const response =await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify(prompt)
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

    useEffect(() =>{

        const getPrompt =async prompt_id =>{
            try {
                const response =await fetch(`/api/prompt/${prompt_id}`);
                const data =await response.json();
                setPrompt({prompt: data.prompt, tag: data.tag});
            } catch (error) {
                console.log(error);
            }
        } 
        if(promptId) getPrompt(promptId);
    }, [promptId]);

    return (
        <Form type ="Edit" post ={prompt} setPost ={setPrompt} submitting ={submitting} handleSubmit ={editPrompt}/>
    )
}

export default UpdatePrompt;