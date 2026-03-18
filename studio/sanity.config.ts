import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'rankflow-cms',
  title: 'RANKFLOW CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').schemaType('blogPost').child(
              S.documentList().title('Blog Posts').filter('_type == "blogPost"')
            ),
            S.listItem().title('Case Studies').schemaType('caseStudy').child(
              S.documentList().title('Case Studies').filter('_type == "caseStudy"')
            ),
            S.listItem().title('Marketing Collateral').schemaType('marketingCollateral').child(
              S.documentList().title('Collaterals').filter('_type == "marketingCollateral"')
            ),
            S.listItem().title('Services').schemaType('service').child(
              S.documentList().title('Services').filter('_type == "service"')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
