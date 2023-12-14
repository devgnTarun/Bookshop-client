import {
  BsTelegram,
  BsLinkedin,
  BsInstagram,
  BsGithub,
  BsFacebook,
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import * as styles from './Footer.css'

const social = [
  {
    title: 'Instagram',
    icon: <BsInstagram size={20} />,
    href: '#',
  },
  {
    title: 'Telegram',
    icon: <BsTelegram size={20} />,
    href: 'https://web.telegram.org/k/',
  },
  {
    title: 'Github',
    icon: <BsGithub size={20} />,
    href: 'https://github.com/zeynabaghabalayi',
  },
  {
    title: 'LinkedIn',
    icon: <BsLinkedin size={20} />,
    href: 'https://www.linkedin.com/feed/',
  },
  {
    title: 'Facebook',
    icon: <BsFacebook size={20} />,
    href: '#',
  },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-12 col-md-auto mb-3 mb-md-0">
            <Link to="/privacy-policy" className={styles.socialLink}>
              Privacy Policy
            </Link>
          </div>
          <div className="col-12 col-md-auto">
            <ul className="list-inline m-0 p-0 d-flex align-items-center">
              {social.map((item) => (
                <li key={item.title} className="list-inline-item me-3">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    {item.icon && (
                      <span className={styles.socialIcon}>{item.icon}</span>
                    )}
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
