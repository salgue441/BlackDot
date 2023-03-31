const fetchActionables = async() => {
    const res = await fetch("http://localhost:3000/actual/accionableDatos")
    const data = await res.json()

    console.log(data)

    return data
}

function handleCheckBox(checkBox) {
    const accionableID = checkBox.value;
  
    fetchActionables().then((data) => {
      console.log(data);
      console.log(accionableID);
    });

    if (checkBox.checked) {
        if (index === -1) {
            waitingAnswers.push({ })
        }
    }
}