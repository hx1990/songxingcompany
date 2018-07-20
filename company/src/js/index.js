export const rem=()=>{
    document.documentElement.style.fontSize=document.documentElement.clientWidth/91+'px'
    console.log(document.documentElement.style.fontSize,document.documentElement.clientWidth)
    
    window.onresize=()=>{
        document.documentElement.style.fontSize=document.documentElement.clientWidth/91+'px'
        console.log(document.documentElement.style.fontSize)
    }
}