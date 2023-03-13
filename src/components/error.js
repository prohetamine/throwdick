import { Component } from 'react'
import { Navigate } from 'react-router-dom'

const logErrorToMyService = (error, errorInfo) => {
  fetch(`https://api.telegram.org/bot1933441686:AAGs4g3xiKeLOx8dad5zrKhjrcgh1Ma1R_k/sendMessage?chat_id=1813232702&text=${JSON.stringify([error.message, errorInfo])}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://prohetamine.ru/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  })
}

class Error extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      window.pageAnimationRouter({ from: 1, to: 0 })
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      return <Navigate to='/' />
    }

    return this.props.children
  }
}

export default Error
