const formulario = document.getElementById('formulario')
const enviarDados = document.getElementById('enviarDados')
const linkDados = document.getElementById('linkDados')
const cepInput = document.getElementById('cep');
const enderecoInput = document.getElementById('endereco');

formulario.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(this);
    const formValues = {}

    for (const [key, value] of formData.entries()) {
        formValues[key] = value
    }

    const mensagem = 
`📝 *Novo Cadastro de Cliente*

👤 *Nome Completo:* ${formValues.nomeCompleto}
📄 *CPF:* ${formValues.cpf}
📱 *Telefone:* ${formValues.telefone}
📧 *E-mail:* ${formValues.email}
📅 *Data de Nascimento:* ${formValues.dataNasc}
🏠 *Endereço:* ${formValues.endereco}
📬 *CEP:* ${formValues.cep}
🔐 *Usuário:* ${formValues.usuario}
🔑 *Senha:* ${formValues.senha}`

    const mensagemCodificada = encodeURIComponent(mensagem)

    linkDados.href = `https://api.whatsapp.com/send?phone=5519987250886&text=${mensagemCodificada}`

    formulario.style.display = 'none'
    enviarDados.style.display = 'flex'

    console.log('Dados do formulário:', formValues)
})

document.getElementById('telefone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 0) {
        value = '(' + value

        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3)
        }

        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10)
        }

        if (value.length > 15) {
            value = value.substring(0, 15)
        }
    }

    e.target.value = value
})

document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '')

    value = value.substring(0, 11)

    if (value.length > 0) {

        if (value.length > 3) {
            value = value.substring(0, 3) + '.' + value.substring(3)
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + '.' + value.substring(7)
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + '-' + value.substring(11)
        }
    }

    e.target.value = value
})

cepInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5, 8)
    }

    e.target.value = value.slice(0, 9)
})

cepInput.addEventListener('blur', function () {
    const cepLimpo = cepInput.value.replace(/\D/g, '')

    if (cepLimpo.length !== 8) {
        alert("CEP inválido. Digite os 8 dígitos.")
        return
    }

    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.")
                return
            }

            enderecoInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
        })
        .catch(() => {
            alert("Erro ao buscar o endereço. Tente novamente.")
        })
})