import React, { useRef } from 'react'

// redux
import { useAppDispatch } from 'redux/store'
import { appSlice } from 'redux/slices'

// material ui
import { Typography, Box, Grid, Button, Link as MaterialLink } from '@mui/material'

// emotion
import styled from '@emotion/styled'

// next
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

// translation
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import i18nConfig from '../i18n'
import CustomHead from 'enhancers/CustomHead'

// react spring
import { useTrail, animated } from 'react-spring'

const HeadText = styled.div``

const Page = () => {
  const { t } = useTranslation('common')
  const WORD_TRANS = t('title.head').split('')
  const words = useRef(WORD_TRANS.map((_, index) => index))
  const [springs, api] = useTrail(WORD_TRANS.length, (index) => ({
    from: { opacity: 0.1, x: 10 },
    to: { opacity: 1, x: 0 },
    loop: { reverse: true },
  }))
  const dispatch = useAppDispatch()

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
          <Link href={router.pathname} locale="en" passHref>
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
          <Link href={router.pathname} locale="de" passHref>
            <MaterialLink
              sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' }, margin: 2 }}
              underline="none"
              href=""
            >
              Dutch
            </MaterialLink>
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link href={router.pathname} locale="fa" passHref>
            <MaterialLink
              sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' }, margin: 2 }}
              underline="none"
              href=""
            >
              Persian
            </MaterialLink>
          </Link>
        </Typography>
        <Box m={16}>
          <Typography variant="subtitle2" color="text.primary">
            Wish Work NEXT JS Boilerplate
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(appSlice.actions.toggleTheme())
          }}
        >
          {t('title.theme')}
        </Button>
      </Grid>
    </div>
  )
}

Page.getLayout = (page: React.ReactElement) => {
  return (
    <>
      <CustomHead title="meta.title" openGraphTitle="head.title" />
      {page}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    locale,
    ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
  },
})

export default Page
