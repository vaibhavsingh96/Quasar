function combined = coherent_combination(sync_sat_signal_matrix,sampling_rate,preamble_sat_signal,sat_signal_packet_length)
    
    sat_signal_packet_length = sat_signal_packet_length*sampling_rate;
    sat_signal_channel_compensated = [];
    
    for i = 1:size(sync_sat_signal_matrix,2)
        
       [sat_signal_preamble_corr_val,sat_signal_preamble_corr_idx] = xcorr(sat_signal_matrix(:,i),preamble_sat_signal);
       [~,sat_signal_preamble_locs] = findpeaks(abs(sat_signal_preamble_corr_val((length(sat_signal_preamble_corr_val)+1)/2:end)),'MinPeakDistance',sat_signal_packet_length);
       
       sat_signal_start = sat_signal_matrix(sat_signal_preamble_locs(1),i);
       sat_signal_preamble_corr_val = sat_signal_preamble_corr_val((length(sat_signal_preamble_corr_val)+1)/2:end);
       sat_signal_channel = sat_signal_preamble_corr_val(sat_signal_preamble_locs)/norm(preamble_sat_signal);
       
       sat_signal_channel_compensated = [sat_signal_channel_compensated,sat_signal_start*conj(repelem(sat_signal_channel,sat_signal_packet_length))];
       
    end
    
    combined = sum(sat_signal_channel_compensated,2);


end