import { Button } from '@/components/ui/button'
import {url, filters} from '@/back_config'

export async function getEvents(categ=[], search=[], sort=[]){
    let categories = Array()
    for (let i = 0; i < categ.length; i++){
        if (categ[i][0] == true) {
            categories.push(filters[i])
        }
    }
    let data = {
        'categories': categories
    }
    console.log(data)
    let resp = await fetch(url+'api/filter_event', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify(data)
    })
    const body = await resp.json()
    console.log(resp.status)
    if (resp.status == 200){
        return body
    }
    else{
        return []
    }
}

export async function getEvent(id){
    let resp = await fetch(url+'api/get_event?id='+id, {
      method: 'GET',
      mode: 'cors',
  })
  
    const body = await resp.json()
    console.log(resp.status)
    if (resp.status == 200){
        return body
    }
    else{
        return []
    }
  }