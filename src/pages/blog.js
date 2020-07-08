import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./blog.css"

const Content = styled.div`\
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const Child = styled.div`
  flex: 1 0 21%;
  margin: 5px;
  height: 100px;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`

const MarkerHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <ul class="cards">
        {data.allMarkdownRemark.edges
          .filter(({ node }) => {
            const rawDate = node.frontmatter.rawDate
            const date = new Date(rawDate)
            return date < new Date()
          })
          .map(({ node }) => (
            <li class="cards__item">
              <div class="card">
                <Link
                  to={node.frontmatter.path}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <img class="card__image" src={node.frontmatter.cover}></img>
                  <div class="card__content">
                    <div class="card__title">{node.frontmatter.title}</div>
                    <p class="card__text">{node.excerpt}. </p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
      </ul>
      {/* <SEO title="Blog" />
      <Content>
        {data.allMarkdownRemark.edges
          .filter(({ node }) => {
            const rawDate = node.frontmatter.rawDate
            const date = new Date(rawDate)
            return date < new Date()
          })
          .map(({ node }) => (
            <Child>
              <div key={node.id}>
                <Link
                  to={node.frontmatter.path}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <img
                    alt=""
                    src={node.frontmatter.cover}
                    sx={{
                      position: `absolute`,
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: `100%`,
                      height: `100%`,
                      filter: `invert(100%)`,
                      zIndex: -1,
                      opacity: 0.08,
                      objectFit: `cover`,
                    }}
                  />
                  <MarkerHeader>{node.frontmatter.title} </MarkerHeader>
                  <div>
                    <ArticleDate>{node.frontmatter.date}</ArticleDate>
                    <ReadingTime> - {node.fields.readingTime.text}</ReadingTime>
                  </div>
                </Link>
              </div>
            </Child>
          ))}
      </Content> */}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            rawDate: date
            path
            cover
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`
