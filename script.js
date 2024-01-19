const balance = document.querySelector("#balance");
const description =document.querySelector("#desc");
const amount= document.querySelector("#amount");
const inc_amt=document.querySelector("#inc-amt");
const exp_amt=document.querySelector("#exp-amt"); 
const trans=document.querySelector("#trans"); 
const form=document.querySelector("#form");

const dummyData=[
    { id:1,description: "Flower",amount: -20},
    { id:2, description: "salary",amount:20000},
    { id:3, description: "Book sales", amount:100},
    { id:4, description: "Camera",amount: -150}
];

let transactions =dummyData;

function loadTransactionDetails(transactions){
   const sign=transactions.amount <0? "-" :"+";
   const item=document.createElement("li");
   item.classList.add(transactions.amount<0? "exp" :"inc");
   item.innerHTML =`${transactions.description}
   <span>${sign} ${Math.abs(transactions.amount)}</span>
   <button class="btn-del" onclick="removeTrans(${transactions.id})">X</button> 
   `;
   trans.appendChild(item);
   
}

function removeTrans(id)  {
    if (confirm("Are you sure you want delete Transcation?")) {
        transactions=transactions.filter((transaction)=>transaction.id != id);
        config();
    } else {
        return;
    }
}
function updateAmount() {
    const amounts =transactions.map((transaction)=> transaction.amount);
    const total=amounts.reduce((acc,item)=>(acc += item),0).toFixed(2);
    balance.innerHTML =` ₹ ${total}`
     
    const income =amounts.filter((item) => item >0).reduce((acc,item) => (acc += item),0).toFixed(2);
    inc_amt.innerHTML=`₹ ${income}`

    const expense =amounts.filter((item) => item <0).reduce((acc,item) => (acc += item),0).toFixed(2);
    exp_amt.innerHTML=`₹ ${Math.abs(expense )}`

}

function config(){
    trans.innerHTML=" ";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
}

function addTransaction(e) {
    e.preventDefault();
    if (description.value.trim()=="" || amount.value.trim()==""){
        alert("Please Enter Description and  amount");
    }
    else{
        const transaction={
            id:25121,
            description:description.value,
            amount:+amount.value,
        };
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value="";
        amount.value="";
        updateAmount();
    }
}

form.addEventListener("submit",addTransaction)

window.addEventListener("load",function(){
    config();
});