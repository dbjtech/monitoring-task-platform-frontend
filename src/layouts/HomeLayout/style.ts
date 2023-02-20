import styled from '@emotion/styled'

const headerHeight = 64

export const HomeHeader = styled.div`
	height: ${headerHeight}px;
	line-height: ${headerHeight}px;
	width: 100%;
	background: #1677ff;
	color: #fff;
	position: relative;
	z-index: 10;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
`

export const HeaderLeft = styled.div`
	font-size: 24px;
	user-select: none;
`

export const HeaderRight = styled.div`
	display: flex;
`

export const LayoutContent = styled.div`
	height: calc(100vh - ${headerHeight}px);
`
