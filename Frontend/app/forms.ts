'use server'
import {url} from '@/back_config'
import { fromTheme } from 'tailwind-merge'
import { redirect } from 'next/navigation'
import HandleStorage from '@/app/handleStorage'

export async function eventForm(formData: FormData){
    console.log(formData)
    let resp = await fetch(url+'api/create_event', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify({
            'title':formData.get('title'),
            'description':formData.get('description'),
            'start_time':formData.get('start_time'),
            'end_time':formData.get('end_time'),
            'categories':'EV',
        })
    })
    
      const body = await resp.json()
      console.log(resp.status)
      if (resp.status == 201){
          return body
      }
      else{
          return []
      }
}    

export async function registerFroms(formData: FormData){
    console.log(formData)
    let resp = await fetch(url+'api/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify({
            'first_name':formData.get('first_name'),
            'last_name':formData.get('last_name'),
            'email':formData.get('email'),
            'password':formData.get('password'),
            'ac_type':formData.get('ac_type'),
        })
    })
    
      const body = await resp.json()
      console.log(resp.status)
      if (resp.status == 201){
        redirect('/account/login')
        return body
      }
      else{
          return []
      }
}
export async function loginFroms(formData: FormData){
    console.log(formData)
    let resp = await fetch(url+'api/token/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify({
            'email':formData.get('email'),
            'password':formData.get('password'),
        })
    })
    
      const body = await resp.json()
      console.log(resp.status)
      if (resp.status == 200) {
        return body
      }
      else{
          return []
      }
}