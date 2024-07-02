function addDigit(digit) {
    const input = document.getElementById('codeInput');
    if (input.value.length < 4) {
        input.value += digit;
    }
}

function clearCode() {
    const input = document.getElementById('codeInput');
    input.value = '';
}

function handleApiResponse(response) {
    return response.json().then(data => {
        if (response.ok) {
            alert(data.message || 'Gate opened successfully.');

            // Trigger NodeMCU to open the gate
            fetch('https://jsonplaceholder.typicode.com/posts/312', { method: 'GET' }) // Replace with your NodeMCU IP address
                .then(nodemcuResponse => {
                    if (nodemcuResponse.ok) {
                        console.log('Gate opened by NodeMCU.');
                    } else {
                        console.error('Failed to open gate with NodeMCU.');
                    }
                })
                .catch(err => console.error('Error triggering NodeMCU:', err));

        } else {
            alert(data.message || 'Failed to open the gate.');
        }
        clearCode();
    });
}

function submitCode() {
    const code = document.getElementById('codeInput').value;
    if (code.length === 4) {
        fetch(`https://cse-parking.up.railway.app/api/activate/${code}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleApiResponse)
        .catch(error => {
            alert('Network error. Please try again.');
            clearCode();
        });
    } else {
        alert('Please enter a 4-digit code.');
    }
}

function submitExitCode() {
    const code = document.getElementById('codeInput').value;
    if (code.length === 4) {
        fetch(`https://cse-parking.up.railway.app/api/exit/${code}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(handleApiResponse)
        .catch(error => {
            alert('Network error. Please try again.');
            clearCode();
        });
    } else {
        alert('Please enter a 4-digit code.');
    }
}
