import React, {memo, FunctionComponent, useState, useRef} from 'react';
import {CloseButton, Dropdown, DropdownButton} from "react-bootstrap";
import {MDBContainer, MDBInput} from "mdbreact";

export interface IDynamicContent {
    index: number,
    type: string,
    content: string,
    closeButtonClick?: Function,
    onStateChange?: Function
}

const DynamicContent: FunctionComponent<IDynamicContent> = ({index, type, content, closeButtonClick, onStateChange}) => {
    const [contentType, setContentType] = useState<string | null>(type || 'unselected');
    const localContent = useRef<string>();

    const onItemSelect = (eventKey: string | null, e: any) => {
        setContentType(eventKey)
    };

    const onStateUpdate = () => {
        if (onStateChange) {
            onStateChange(index, contentType, localContent.current)
        }
    }

    const getDropdownTitle = (state: string | null): string => {
        switch (state) {
            case 'heading':
                return 'Heading'
            case 'subheading':
                return 'Subheading'
            case 'paragraph':
                return 'Paragraph'
            default:
            case 'unselected':
                return 'Choose content type';
        }
    }

    const getTextRows = (state: string | null): number => {
        switch (state) {
            case 'heading':
                return 1;
            case 'subheading':
                return 2;
            case 'paragraph':
                return 8;
            default:
            case 'unselected':
                return 0;
        }
    }

    return (
        <div className="d-flex bd-highlight">
            <DropdownButton
                className="p-2 bd-highlight col-example"
                id="dropdown-basic-button"
                title={getDropdownTitle(contentType)}>

                <Dropdown.Item eventKey="heading" onSelect={onItemSelect}>Heading</Dropdown.Item>
                <Dropdown.Item eventKey="subheading" onSelect={onItemSelect}>Subheading</Dropdown.Item>
                <Dropdown.Item eventKey="paragraph" onSelect={onItemSelect}>Paragraph</Dropdown.Item>
            </DropdownButton>
            <MDBContainer>
                <MDBInput
                    valueDefault={content}
                    className="p-10 bd-highlight w-100"
                    size="lg"
                    type='textarea'
                    label='Content'
                    rows={getTextRows(contentType)}
                    onChange={(e) => {
                        localContent.current = e.currentTarget.value;
                        onStateUpdate()
                    }}
                />
            </MDBContainer>
            <CloseButton
                onClick={(_) => {
                    if (closeButtonClick) {
                        closeButtonClick(index);
                    }
                }}
            />
        </div>
    )
}

export default memo(DynamicContent);
