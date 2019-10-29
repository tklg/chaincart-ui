import React, { Component } from 'react'
import { connect } from 'react-redux'
import './dashboard.scss'

function selectText (elem) {
  let range
  if (document.selection) {
    range = document.body.createTextRange()
    range.moveToElementText(elem)
    range.select()
  } else if (window.getSelection) {
    range = document.createRange()
    range.selectNodeContents(elem)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }
}

class Activate extends Component {
  render () {
    const store = this.props.store
    if (!store) return <div />
    return (
      <div className='dashboard activate'>
        <h1>Add your cart to your website</h1>

        <h2>Chaincart tag</h2>
        <p>This is the Chaincart embed code for this storefront. Copy and paste this code inside the <code>&lt;head&gt;</code> of all pages of your website that you want the cart and products to be available on.</p>

        <pre className='textarea' onClick={e => selectText(e.target)}>
        {`<!-- Chaincart embed tag (ccart.js) - Chaincart -->
<script async src="https://api.chaincart.net/cc/js?id=${store.id}"></script>
<script type="text/javascript">
  window.chainLayer = window.chainLayer || {}
  window.chainLayer.config = '${store.id}'
  window.chainLayer.storeName = '${store.name}'
</script>`}
        </pre>

        <h2>Add-to-cart buttons</h2>
        <p>Copy and paste the 'Add to cart' buttons for each product on the Products page, or add the <code>data-ccart-product</code> attribute to existing buttons on your website.</p>

        {/*<h1>Allowed domains</h1>*/}
        <h2>Cart button</h2>
        <p>Copy and paste this code into your website to add a 'View Cart' button. You can also add the <code>data-ccart-view-cart</code> attribute to an element to use it as the button.</p>
        <pre className='textarea' onClick={e => selectText(e.target)}>
        {`<button data-ccart-view-cart>View cart</button>`}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = ({ storefronts }, props) => {
  const store = storefronts.find(x => x.id === props.id)
  return {
    store
  }
}

export default connect(mapStateToProps)(Activate)
