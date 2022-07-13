import { gql } from '@apollo/client';

export const GET_DEFAULT_SETTING = gql`
    query {
        defaultSetting {
            header_top_block
            footer_block
            color_default
            color_white
            color_primary
            color_primary_hover
            color_gray
            color_gray_dark
            color_gray_darker
            color_teal
            color_teal_light
            color_border
            color_error
            color_text
            color_text_hint
            text_xs
            xs_line_height
            xs_letter_space
            text_sm
            sm_line_height
            sm_letter_space
            text_base
            base_line_height
            base_letter_space
            text_lg
            lg_line_height
            lg_letter_space
            text_xl
            xl_line_height
            xl_letter_space
            text_2xl
            xl2_line_height
            xl2_letter_space
            text_3xl
            xl3_line_height
            xl3_letter_space
            text_4xl
            xl4_line_height
            xl4_letter_space
            text_5xl
            xl5_line_height
            xl5_letter_space
        }
    }
`;

export default {
    getDefaultSetting: GET_DEFAULT_SETTING
};
