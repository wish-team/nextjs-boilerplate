import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MaterialLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CustomHead from 'enhancers/CustomHead'
import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { animated, useTrail } from 'react-spring'
import getInitialState from 'store/getInitialState'
import { useStore } from 'store/store'
import i18nConfig from '../next-i18next.config'

const HeadText = styled.div``

const Page = () => {
  const { t } = useTranslation('common')
  const WORD_TRANS = t('title.head').split('')

  const [springs] = useTrail(WORD_TRANS.length, () => ({
    from: { opacity: 0.1, x: 10 },
    to: { opacity: 1, x: 0 },
    loop: { reverse: true },
  }))

  const toggleTheme = useStore((state) => state.toggleTheme)

  const router = useRouter()

  return (
    <div>
      <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <HeadText>
          {springs.map(({ opacity }, i) => (
            <Typography key={i} variant="h2" sx={{ display: 'inline-block' }} color="text.primary">
              <animated.div style={{ opacity }}>{WORD_TRANS[i]}</animated.div>
            </Typography>
          ))}
        </HeadText>
        <Typography variant="subtitle1" color="text.secondary">
          <Link href={router.asPath} locale="en" passHref>
            <MaterialLink
              sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' }, margin: 2 }}
              underline="none"
              href=""
            >
              English
            </MaterialLink>
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link href={router.asPath} locale="de" passHref>
            <MaterialLink
              sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' }, margin: 2 }}
              underline="none"
              href=""
            >
              Dutch
            </MaterialLink>
          </Link>
        </Typography>
        <Box m={16}>
          <Typography variant="subtitle2" color="text.primary">
            Wish Work NEXT JS Boilerplate
          </Typography>
        </Box>
        <Button variant="outlined" onClick={toggleTheme}>
          {t('title.theme')}
        </Button>
      </Grid>
    </div>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return (
    <>
      <CustomHead
        title="meta.title"
        summaryCardTitle="title.head"
        metaTitle={''}
        metaTitleContent={''}
        url={''}
        description={''}
        image={''}
      />
      {page}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => ({
  props: {
    locale,
    initialState: getInitialState(req.headers),
    ...(await serverSideTranslations(locale ?? '', ['common'], i18nConfig)),
  },
})

export default Page
