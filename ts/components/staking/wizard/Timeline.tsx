import * as React from 'react';
import styled from 'styled-components';

import { colors } from 'ts/style/colors';

interface TimelineItem {
    date: string;
    fromNow: string;
    title: string;
    description: string;
    isActive: boolean;
}

interface TimelineProps {
    items: TimelineItem[];
    activeItemIndex: number;
    header: string;
    description: string;
}

interface TimelineContentProps {
    isActive: boolean;
}

const TimelineItem = styled.li`
    display: flex;
`;

const TimelineDate = styled.div`
    font-size: 17px;
    font-weight: 300;
    flex: 0 0 90px;
    display: none;

    @media (min-width: 768px) {
        display: block;
    }

    & > span {
        margin-bottom: 10px;
        display: block;
        &:last-child {
            color: ${colors.textDarkSecondary};
        }
    }
`;

const TimelineDateMobile = styled(TimelineDate)`
    display: block;

    @media (min-width: 768px) {
        display: none;
    }
`;

const TimelineContent = styled.div<TimelineContentProps>`
    border-left: 1px solid #e6e6e6;
    padding: 0 40px 60px;
    position: relative;
    margin-left: 7px;

    @media (min-width: 768px) {
        margin-left: 0;
    }

    ${TimelineItem}:last-child & {
        border-left: 0;
    }

    h3 {
        font-size: 20px;
        margin-bottom: 15px;
    }

    p {
        font-size: 17px;
        font-weight: 300;
        color: ${colors.textDarkSecondary};
        line-height: 1.35;
    }

    ${TimelineItem}:last-child & {
        padding-bottom: 0;
    }

    &:before {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: ${props => (props.isActive ? colors.black : '#E6E6E6')};
        top: 0;
        left: -8px;
    }
`;

const TimelineHeader = styled.h1`
    font-size: 36px;
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 15px;

    @media (min-width: 768px) {
        font-size: 50px;
    }
`;

const TimelineDescription = styled.h2`
    font-size: 17px;
    font-weight: 300;
    color: ${colors.textDarkSecondary};
    line-height: 1.44;
    margin-bottom: 30px;
    max-width: 340px;

    @media (min-width: 768px) {
        margin-bottom: 60px;
        font-size: 18px;
    }
`;

export const Timeline: React.FC<TimelineProps> = props => {
    const { items, activeItemIndex, header } = props;
    return (
        <>
            <TimelineHeader>{header}</TimelineHeader>
            <TimelineDescription>{props.description}</TimelineDescription>
            <ol>
                {items.map((item, index) => {
                    const { date, fromNow, title, description } = item;
                    const isActive = activeItemIndex === index;
                    return (
                        <TimelineItem key={index.toString()}>
                            <TimelineDate>
                                <span>{fromNow}</span>
                                <span>{date}</span>
                            </TimelineDate>
                            <TimelineContent isActive={isActive}>
                                <TimelineDateMobile>
                                    <span>{fromNow}</span>
                                    <span>{date}</span>
                                </TimelineDateMobile>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </ol>
        </>
    );
};
