export function calendar(){
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth();


    // output the name of the month
    datums.innerHTML = d.toLocaleString('default', { month: 'long' });
}