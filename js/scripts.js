function handleApiResponse(response) {
    return response.json().then(data => {
        if (response.ok) {
            alert(data.message || 'Gate opened successfully.');
            // Trigger a mock NodeMCU response
            fetch(`https://jsonplaceholder.typicode.com/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: 'Gate Control', body: 'Gate opened', userId: 1 })
            })
                .then(response => response.json())
                .then(json => console.log('Mock NodeMCU response:', json))
                .catch(err => console.error('Error triggering mock NodeMCU:', err));
        } else {
            alert(data.message || 'Failed to open the gate.');
        }
        clearCode();
    });
}

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

function submitCode() {
    const code = document.getElementById('codeInput').value;
    if (code.length === 4) {
        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
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
        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
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
