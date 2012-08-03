($) ->
	
	$.fn.slides = (@src, @duration = 5000) ->
		slides = []
		index = 0
		stage = ($ "<div id='#{($ @).attr("id") + "Stage"}'></div>")
		
		move = (direction) =>
			@transitioning = yes
			clearTimeout @tick
			index += direction
			stage.append(slides[index % slides.length])
			stage.find('div').last().hide().fadeIn(400, =>
				stage.find('div').first().remove()	
				@transitioning = no
				@tick = setTimeout  move, @duration, 1 
			)
		
		(@.find '.previousBtn').on "click", (evt) => move -1 unless @transitioning
		(@.find '.nextBtn').on "click", (evt) => move 1 unless @transitioning
		
		srcCall = $.ajax @src, 
			cache: false
			complete: ->
				console?.log "complete"
			success: (data) =>
				slides = ($ data).filter "div.slide"
				($ slide).css "position", "absolute" for slide in slides 
				index = slides.length * 500	
				@.prepend ($ data).filter "style"
				@.append stage
				stage.append slides[0]
				@tick = setTimeout move, @duration, 1 
			err: (message) ->
				console?.log message
					
		@			
	
(jQuery)