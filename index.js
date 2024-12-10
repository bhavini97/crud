function handleFormSubmit(event){
    event.preventDefault();
    const userDetails={
        username : event.target.username.value,
        email : event.target.email.value,
        phone : event.target.phone.value
    }
    axios.post('https://crudcrud.com/api/50b685323fa24972aec56cb766ed4965/appointmentData',userDetails)
    .then(()=>showDetails());

} 
async function showDetails(){
    const arr = await axios.get('https://crudcrud.com/api/50b685323fa24972aec56cb766ed4965/appointmentData')
    const data = arr.data;
    const ul = document.querySelector('ul');
    ul.innerHTML ='';
     data.forEach(element => {
        const li = document.createElement('li');
        const str = `${element.username} - ${element.email} - ${element.phone}`
        li.append(str);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        const id = element._id;
        delBtn.addEventListener('click',()=>{
            axios.delete(`https://crudcrud.com/api/50b685323fa24972aec56cb766ed4965/appointmentData/${id}`)
            .then(()=>li.remove());
        })
        li.append(delBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click',()=>{
            document.getElementById('username').value = element.username;
            document.getElementById('email').value = element.email;
            document.getElementById('phone').value = element.phone;
            axios.delete(`https://crudcrud.com/api/50b685323fa24972aec56cb766ed4965/appointmentData/${id}`)
            .then(()=>li.remove());  
        })
        li.append(editBtn);
        ul.append(li);
     });
}
document.addEventListener('DOMContentLoaded',showDetails);