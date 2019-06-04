import React, { Component } from 'react';
import { Document, Page, Outline } from 'react-pdf/dist/entry.webpack';

import samplePDF from './sample.pdf';

export default class PdfViewer extends Component {

    state = {
        numPages: null,
    }

    onDocumentLoadSuccess = (document) => {
        const { numPages } = document;
        this.setState({
            numPages,
            pageNumber: 1,
            scale: 1
        });
    };

    changePage = offset => this.setState(prevState => ({
        pageNumber: prevState.pageNumber + offset
    }));

    previousPage = () => this.changePage(-1);

    nextPage = () => this.changePage(1);

    changeScale = offset => this.setState(prevState => ({
        scale: prevState.scale + offset
    }));

    zoomOut = () => this.changeScale(-0.25);

    zoomIn = () => this.changeScale(0.25);

    render() {
        const { numPages, pageNumber, scale } = this.state;

        return (
            <React.Fragment>
                <div style={{
                    height: '500px',
                    width: '70%',
                    overflow: 'scroll',
                    resize: 'both'
                }}>
                    <Document
                        file={samplePDF}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Outline onItemClick={this.onItemClick} />
                        <Page
                            pageNumber={pageNumber || 1}
                            scale={scale}
                        />

                    </Document>
                </div>
                <div>
                    <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={this.previousPage}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={this.nextPage}
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        onClick={this.zoomIn}
                    >
                        Zoom In
                    </button>
                    <button
                        type="button"
                        onClick={this.zoomOut}
                    >
                        Zoom Out
                    </button>
                </div>
            </React.Fragment>
        );
    }
}