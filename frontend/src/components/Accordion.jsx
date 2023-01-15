import React from 'react'

export default function Accordion(props) {
    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${props.index.toString()}`}>
                    <button style={{height:'3.7vh'}} className="accordion-button collapsed ps-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${props.index.toString()}`} aria-expanded="false" aria-controls={`collapse${props.index.toString()}`}>
                        <span className='fw-bold text-dark'>Description:</span>
                    </button>
                </h2>
                <div id={`collapse${props.index.toString()}`} className="accordion-collapse collapse" aria-labelledby={`heading${props.index.toString()}`} data-bs-parent="#accordionExample">
                    <div className="accordion-body">{props.data}
                    </div>
                </div>
            </div>
        </div>
    )
}
