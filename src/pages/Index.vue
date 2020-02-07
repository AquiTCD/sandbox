<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <!-- <Author :show-title="true" /> -->

    <!-- List posts -->
    <!-- <div class="posts">
      <PostCard
        v-for="edge in $page.posts.edges"
        :key="edge.node.id"
        :post="edge.node"
      />
    </div> -->
    <div v-for="item in $page.posts.edges" :key="item.path" class="post">
      <h2>
        <g-link :to="item.node.path">{{ item.node.title }}</g-link>
      </h2>
      <dl>
        <dt>{{ item.node.date }}</dt>
        <!-- <dd>{{ item.node.fields.tags }}</dd> -->
      </dl>
      <!-- <p>{{ item.node.fields.description }}</p> -->
      <g-link :to="item.node.path" class="continue-link">続きを読む ></g-link>
    </div>
  </Layout>
</template>

<page-query>
  query {
    posts: allPost {
      edges {
        node {
          id
          title
          date (format: "D. MMMM YYYY")
          # timeToRead
          # description
          # cover_image (width: 770, height: 380, blur: 10)
          path
          # tags {
          #  id
          #  title
          #  path
          # }
        }
      }
    }
  }
</page-query>

<script>
// import Author from '~/components/Author.vue'
// import PostCard from '~/components/PostCard.vue'
export default {
  components: {
    // Author,
    // PostCard,
  },
  metaInfo: {
    title: `Hello, world!`,
  },
}
</script>
