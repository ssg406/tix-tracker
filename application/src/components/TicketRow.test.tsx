import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TicketRow from './TicketRow';

describe('App', () => {
    it('renders app component', () => {
        render(<TicketRow status='none' description='some stuff' ticketId={83483498483} />);
        screen.debug();
    })
})