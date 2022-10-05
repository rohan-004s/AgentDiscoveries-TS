=============================================

# Entities

## Location

A location is a physical place that an agent may be stationed

- _Site Name_ is the codename for that location, e.g. `MI6`
- _Location_ is the long description of the location, e.g. `London`
- _Time Zone_ is the time zone in one of the following formats:
  - UTC: 'UTC', 'UT or 'GMT'
  - Offsets: '+01:00', 'UTC-02:00', 'GMT+03:00' etc.
  - Zone ID: 'Europe/London', 'America/New_York' etc.

## Region

A region encompassing an area in the world

- _Region Name_ is the name for that region, e.g. `England`
- _Locations_ are locations that fall under that region

## Location Report

A report from a specific agent about a specific location

- _Location_ is the location that the report was made
- _Status_ is a numeric code for the report type (the significance of any
  particular code is secret)
- _Time_ is the time of the report, calculated on submission
- _Body_ is the content of the report

## Region Summary

Region summaries are similar to reports, but made for an entire region

- _Region_ is the region which the summary covers
- _Status_ is a numeric code for the region status
- _Time_ is the time of the summary, calculated on submission
- _Body_ is the content of the summary

# Users

A _user_ is somebody who can access the site by logging in with their
_username_ and _password_. This gives them permission to:

- View their profile
- Encode and Decode today's message

A user with _admin_ set to true is also an administrator, this gives them
permission to:

- Manage regions, locations and users
- Search location reports and region summaries

## Agents

A user may also be associated with a particular _agent_. This requires some
additional information:

- _Call Sign_ is the agent's codename
- _First Name_ and _Last Name_ are their real names
- _Date of Birth_ is self-explanatory
- _Rank_ is their current ranking level

An agent may submit location reports and region summaries.
