/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
exports.createPages = ({boundActionCreators, graphql}) =>{
    const {createPage} = boundActionCreators;

    const postTemplate = path.resolve('src/templates/blog-posts.js');
    
    return graphql(`
        {
            allMarkdownRemark{
                edges{
                  node{
                    frontmatter{
                      path
                      title
                      date
                      author
                    }
                    id
                    excerpt
                    html
                  }
                }
              }
        }
    `).then(res=>{
        if(res.errors){
            return Promise.reject(res.errors)
        }else{
            alert(res);
            return res.data.allMarkdownRemak.edges.forEach(({node})=>{
                createPage({
                    path: node.frontmatter.path, 
                    component: postTemplate
                })
            })
        }
    })
}