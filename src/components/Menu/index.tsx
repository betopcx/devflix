import { useEffect, useState } from 'react'
import { NextRouter, withRouter } from 'next/router'
import Link from 'next/link'

import Button from 'components/Button'

import { Nav, Logo, Commands, Astro } from './styles'

type MenuProps = {
  router: NextRouter
}

const Menu = ({ router }: MenuProps) => {
  const [theme, setTheme] = useState<string>('')
  const [viewForehead, setViewForehead] = useState<boolean>(true)

  const isDarkMode = theme === 'dark'

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  useEffect(() => {
    if (router.route === '/') {
      const handleScroll = () => {
        const element = document.getElementById('logo_forehead')
        if (element) {
          const bounding = element.getBoundingClientRect()

          const isViewpoort =
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <=
              (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <=
              (window.innerHeight || document.documentElement.clientHeight)

          setViewForehead(isViewpoort)
        }
      }

      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setViewForehead(false)
    }
  }, [router.route])

  const handleTheme = () =>
    window.__setPreferredTheme(isDarkMode ? 'light' : 'dark')

  return (
    <Nav>
      <Link href="/">
        <Logo
          className="Logo"
          src={'/img/logo.png'}
          viewForehead={viewForehead}
        />
      </Link>
      {/*<Search type="text" placeholder="Pesquisa" />*/}
      <Commands>
        {router.route !== '/cadastro/video' && (
          <Link href="/cadastro/video">
            <Button as="a">Novo Vídeo</Button>
          </Link>
        )}
        {router.route === '/cadastro/video' && (
          <Link href="/cadastro/categoria">
            <Button as="a">Nova Categoria</Button>
          </Link>
        )}
        <Astro onClick={handleTheme} />
      </Commands>
    </Nav>
  )
}

export default withRouter(Menu)
