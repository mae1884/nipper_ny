import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post, tagColor, isFirst }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <Link to={url} className={`post-card ${isFirst ? 'post-card-large' : ''}`}>
            <header className="post-card-header post-card-image-link">
                {post.feature_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.feature_image})` ,
                    }}></div>}
            </header>
            <div className="post-card-content">
                {post.tags && <div className="post-card-tags" style={{ color: tagColor }}> <Tags post={post} visibility="public" autolink={false} /></div>}
                {post.featured && <div className="post-card-tags" style={{ color: tagColor }}><span>Featured</span></div>}
                <h2 className="post-card-title">{post.title}</h2>
                <section className="post-card-excerpt">{post.excerpt}</section>
                <footer className="post-card-footer">
                    <div className="post-card-footer-left">
                        <div className="post-card-avatar">
                            {post.primary_author.profile_image ?
                                <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                                <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
                            }
                        </div>
                        <span>{ post.primary_author.name }</span>
                    </div>
                    <div className="post-card-footer-right">
                        <div>{readingTime}</div>
                    </div>
                </footer>
            </div>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    tagColor: PropTypes.string,
    isFirst: PropTypes.bool
}

export default PostCard
