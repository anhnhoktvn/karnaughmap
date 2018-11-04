import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormGroup, Label, Input } from 'reactstrap'
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'
import KarnaughMapElement from './KarnaughMapElement'
import CSSGridWarning from '../Misc/CSSGridWarning'
import { calcPositionMatrix, calcPosition } from '../../utils/recursiveFolding'

const StyledKarnaughMap = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
`

const GreenBox = styled.span`
  background: #01ff70;
  height: 1rem;
  width: 1rem;
  display: inline-block;
  margin-bottom: -0.125rem;
`

const KarnaughMap = ({ booleanExpressions = [], numberOfInputs }) => {
  const positionMatrix = calcPositionMatrix(numberOfInputs + 1)
  const [displayType, setDisplayType] = useState('names')

  return (
    <>
      <h2>Karnaugh Map</h2>
      <CSSGridWarning />
      <p>
        <GreenBox /> = True expression
      </p>
      <FormGroup>
        <Label>Display type</Label>
        <Input
          type="select"
          name="displayType"
          id="displayType"
          value={displayType}
          onChange={e => setDisplayType(e.target.value)}
        >
          <option value="names">Input names</option>
          <option value="binary">Binary values</option>
          <option value="rowNumber">Just row number</option>
        </Input>
      </FormGroup>
      <HorizontalScrollWrapper>
        <StyledKarnaughMap>
          {booleanExpressions.map(booleanExpression => {
            const { rowNumber } = booleanExpression
            const [row, column] = calcPosition(rowNumber, positionMatrix)

            return (
              <KarnaughMapElement
                booleanExpression={booleanExpression}
                column={column}
                row={row}
                displayType={displayType}
                key={rowNumber}
              />
            )
          })}
        </StyledKarnaughMap>
      </HorizontalScrollWrapper>
    </>
  )
}

KarnaughMap.propTypes = {
  booleanExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired,
  numberOfInputs: PropTypes.number.isRequired
}

export default KarnaughMap
