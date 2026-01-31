import { css } from '@emotion/react';

export const container = css`
  border: 2px dashed #e53e3e;
  background-color: #fff5f5;
  border-radius: 8px;
  text-align: center;
  color: #c53030;
`;

export const errorPre = css`
  background: #fed7d7;
  padding: 12px;
  border-radius: 4px;
  text-align: left;
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
  margin-bottom: 16px;
  max-height: 200px;
  overflow-y: auto;
`;