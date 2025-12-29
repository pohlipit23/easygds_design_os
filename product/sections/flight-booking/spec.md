# Flight Booking Specification

## Overview
A comprehensive search results page for selecting outbound and return flights. The interface features a single-page split layout for sequential flight selection, integrated rich filtering, and detailed flight information.

## User Flows
- View Results: Users view results for the search criteria (displayed in the shell header).
- Select Outbound & Return: Users select an outbound flight from the first section, followed by a return flight from the second section on the same page.
- Filter & Sort: Users refine results using a sidebar with filters for Stops, Price, Baggage, Airlines, and Time.
- View Details: Users can access granular details (flight #, aircraft type, tech stops, fare rules) via an expanded view or modal.

## UI Requirements
- App Shell Integration: Content displays inside the standard application shell.
- Split Selection Interface: Distinct sections for "Outbound" and "Return" results on the same page.
- Advanced Filtering Sidebar: Sticky sidebar on desktop with multi-select common filters.
- Rich Flight Cards: Detailed cards showing airline brand, timing, layover info, and pricing.
- Flight Details Modal/Panel: Mechanism to show technical details and full fare rules.

## Configuration
- shell: true
