import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import color from 'co/collections/utils/color'
import Module from './module'
import Error from 'co/common/alert/error'
import { Wrap, Loading } from './style'

class BookmarkAdd extends React.Component {
	static options({collectionId}) {
		return {
			tintColor: color(collectionId),
			topBar: {
				title: {
					text: t.s('uploadProgress')
				}
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status) {
			switch(this.props.status) {
				case 'removed':
				case 'loaded':
					Navigation.replace(this.props, 'bookmark/edit', {
						_id: this.props.item._id,
						title: this.props.status == 'loaded' ? t.s('saveSuccess') : ''
					})
				break
			}
		}
	}

	render() {
		let content = null
		switch(this.props.status) {
			case 'error':
				content = <Error />
				break

			default:
				content = <Loading />
		}

		return (
			<Wrap>
				{content}
			</Wrap>
		)
	}
}

export default Module(BookmarkAdd)